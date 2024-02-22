import * as React from "react";
import { BackHandler } from "react-native";
import { View, Text, Pressable } from "dripsy";
import { useRelativePosition } from "../hooks";
import { Portal as RNPPortal } from "../portal";
import * as Slot from "../slot/slot-native";

const RootContext = React.createContext(null);

const Root = React.forwardRef(
  (
    {
      asChild,
      value,
      onValueChange,
      open,
      onOpenChange,
      disabled,
      ...viewProps
    },
    ref
  ) => {
    const nativeID = React.useId();
    const [triggerPosition, setTriggerPosition] = React.useState(null);
    const [contentLayout, setContentLayout] = React.useState(null);

    const Component = asChild ? Slot.View : View;
    return (
      <RootContext.Provider
        value={{
          value,
          onValueChange,
          open,
          onOpenChange,
          disabled,
          contentLayout,
          nativeID,
          setContentLayout,
          setTriggerPosition,
          triggerPosition,
        }}
      >
        <Component ref={ref} {...viewProps} />
      </RootContext.Provider>
    );
  }
);

Root.displayName = "RootNativeSelect";

function useSelectContext() {
  const context = React.useContext(RootContext);
  if (!context) {
    throw new Error(
      "Select compound components cannot be rendered outside the Select component"
    );
  }
  return context;
}

const Trigger = React.forwardRef(
  ({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
    const triggerRef = React.useRef(null);
    const {
      open,
      onOpenChange,
      disabled: disabledRoot,
      setTriggerPosition,
    } = useSelectContext();

    React.useImperativeHandle(
      ref,
      () => {
        if (!triggerRef.current) {
          return new View({});
        }
        return triggerRef.current;
      },
      [triggerRef.current]
    );

    function onPress(ev) {
      if (disabled) return;
      triggerRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
        setTriggerPosition({ width, pageX, pageY: pageY, height });
      });
      onOpenChange(!open);
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Component
        ref={triggerRef}
        aria-disabled={disabled ?? undefined}
        role="combobox"
        onPress={onPress}
        disabled={disabled ?? disabledRoot}
        aria-expanded={open}
        {...props}
      />
    );
  }
);

Trigger.displayName = "TriggerNativeSelect";

const Value = React.forwardRef(({ asChild, placeholder, ...props }, ref) => {
  const { value } = useSelectContext();
  const Component = asChild ? Slot.Text : Text;
  return (
    <Component ref={ref} {...props}>
      {value?.label ?? placeholder}
    </Component>
  );
});

Value.displayName = "ValueNativeSelect";

/**
 * @warning when using a custom `<PortalHost />`, you might have to adjust the Content's sideOffset.
 */
function Portal({ forceMount, hostName, children }) {
  const value = useSelectContext();

  if (!value.triggerPosition) {
    return null;
  }

  if (!forceMount) {
    if (!value.open) {
      return null;
    }
  }

  return (
    <RNPPortal hostName={hostName} name={`${value.nativeID}_portal`}>
      <RootContext.Provider value={value}>{children}</RootContext.Provider>
    </RNPPortal>
  );
}

const Overlay = React.forwardRef(
  (
    {
      asChild,
      forceMount,
      onPress: OnPressProp,
      closeOnPress = true,
      ...props
    },
    ref
  ) => {
    const { open, onOpenChange, setTriggerPosition, setContentLayout } =
      useSelectContext();

    function onPress(ev) {
      if (closeOnPress) {
        setTriggerPosition(null);
        setContentLayout(null);
        onOpenChange(false);
      }
      OnPressProp?.(ev);
    }

    if (!forceMount) {
      if (!open) {
        return null;
      }
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return <Component ref={ref} onPress={onPress} {...props} />;
  }
);

Overlay.displayName = "OverlayNativeSelect";

/**
 * @info `position`, `top`, `left`, and `maxWidth` style properties are controlled internally. Opt out of this behavior by setting `disablePositioningStyle` to `true`.
 */
const Content = React.forwardRef(
  (
    {
      asChild = false,
      forceMount,
      align = "start",
      side = "bottom",
      sideOffset = 0,
      alignOffset = 0,
      avoidCollisions = true,
      onLayout: onLayoutProp,
      insets,
      style,
      disablePositioningStyle,
      position: _position,
      ...props
    },
    ref
  ) => {
    const {
      open,
      onOpenChange,
      contentLayout,
      nativeID,
      triggerPosition,
      setContentLayout,
      setTriggerPosition,
    } = useSelectContext();

    React.useEffect(() => {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          setTriggerPosition(null);
          setContentLayout(null);
          onOpenChange(false);
          return true;
        }
      );

      return () => {
        setContentLayout(null);
        backHandler.remove();
      };
    }, []);

    const positionStyle = useRelativePosition({
      align,
      avoidCollisions,
      triggerPosition,
      contentLayout,
      alignOffset,
      insets,
      sideOffset,
      side,
      disablePositioningStyle,
    });

    function onLayout(event) {
      setContentLayout(event.nativeEvent.layout);
      onLayoutProp?.(event);
    }

    if (!forceMount) {
      if (!open) {
        return null;
      }
    }

    const Component = asChild ? Slot.View : View;
    return (
      <Component
        ref={ref}
        role="list"
        nativeID={nativeID}
        aria-modal={true}
        style={[positionStyle, style]}
        onLayout={onLayout}
        onStartShouldSetResponder={onStartShouldSetResponder}
        {...props}
      />
    );
  }
);

Content.displayName = "ContentNativeSelect";

const ItemContext = React.createContext(null);

const Item = React.forwardRef(
  (
    {
      asChild,
      value: itemValue,
      label,
      onPress: onPressProp,
      disabled = false,
      closeOnPress = true,
      ...props
    },
    ref
  ) => {
    const {
      onOpenChange,
      value,
      onValueChange,
      setTriggerPosition,
      setContentLayout,
    } = useSelectContext();
    function onPress(ev) {
      if (closeOnPress) {
        setTriggerPosition(null);
        setContentLayout(null);
        onOpenChange(false);
      }

      onValueChange(
        value?.value === itemValue ? undefined : { value: itemValue, label }
      );
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <ItemContext.Provider value={{ itemValue, label }}>
        <Component
          ref={ref}
          role="option"
          onPress={onPress}
          disabled={disabled}
          aria-checked={value?.value === itemValue}
          aria-valuetext={label}
          aria-disabled={!!disabled}
          accessibilityState={{
            disabled: !!disabled,
            checked: value?.value === itemValue,
          }}
          {...props}
        />
      </ItemContext.Provider>
    );
  }
);

Item.displayName = "ItemNativeSelect";

function useItemContext() {
  const context = React.useContext(ItemContext);
  if (!context) {
    throw new Error(
      "Item compound components cannot be rendered outside of an Item component"
    );
  }
  return context;
}

const ItemText =
  React.forwardRef >
  (({ asChild, ...props }, ref) => {
    const { label } = useItemContext();

    const Component = asChild ? Slot.Text : Text;
    return (
      <Component ref={ref} {...props}>
        {label}
      </Component>
    );
  });

ItemText.displayName = "ItemTextNativeSelect";

const ItemIndicator = React.forwardRef(
  ({ asChild, forceMount, ...props }, ref) => {
    const { itemValue } = useItemContext();
    const { value } = useSelectContext();

    if (!forceMount) {
      if (value?.value !== itemValue) {
        return null;
      }
    }
    const Component = asChild ? Slot.View : View;
    return <Component ref={ref} role="presentation" {...props} />;
  }
);

ItemIndicator.displayName = "ItemIndicatorNativeSelect";

const Group = React.forwardRef(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role="group" {...props} />;
});

Group.displayName = "GroupNativeSelect";

const Label = React.forwardRef(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.Text : Text;
  return <Component ref={ref} {...props} />;
});

Label.displayName = "LabelNativeSelect";

const Separator = React.forwardRef(({ asChild, decorative, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <Component
      role={decorative ? "presentation" : "separator"}
      ref={ref}
      {...props}
    />
  );
});

Separator.displayName = "SeparatorNativeSelect";

const ScrollUpButton = ({ children }) => {
  return children;
};

const ScrollDownButton = ({ children }) => {
  return children;
};

const Viewport = ({ children }) => {
  return children;
};

export {
  Content,
  Group,
  Item,
  ItemIndicator,
  ItemText,
  Label,
  Overlay,
  Portal,
  Root,
  ScrollDownButton,
  ScrollUpButton,
  Separator,
  Trigger,
  Value,
  Viewport,
  useItemContext,
  useSelectContext,
};

function onStartShouldSetResponder() {
  return true;
}
