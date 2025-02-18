import React, { useEffect } from "react";
import useToast from "./hooks/useToast"; // Import useToast

const WidgetLifecycle = ({ children }) => {
  // Receives children
  const { showSuccessToast, showErrorToast } = useToast();

  useEffect(() => {
    // onRefresh logic, set up *once* in a useEffect
    if (window.widget) {
      // Make sure we have access to the widget object
      const onRefresh = async () => {
     };

      window.widget.addEvent("onRefresh", onRefresh);
      return () => {
        // Cleanup: Remove the event listener when the component unmounts
        window.widget.removeEvent("onRefresh", onRefresh);
      };
    }
  }, [showSuccessToast, showErrorToast]); // Correct dependencies

  return <>{children}</>; // Render children
};

export default WidgetLifecycle;
