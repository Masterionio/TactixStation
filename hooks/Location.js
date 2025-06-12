import { useState, useEffect } from "react";

export function useLocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [permission, setPermission] = useState("prompt"); // prompt, granted, denied

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setPermission("denied");
      return;
    }

    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      setPermission(result.state);
      result.onchange = () => setPermission(result.state);
    });

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation(pos.coords);
        setPermission("granted");
      },
      (err) => {
        setError(err.message);
        setPermission("denied");
      }
    );
  }, []);

  return { location, error, permission };
}
