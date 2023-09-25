import { useEffect, useState } from "react";

/**
 * 
 * @returns array of all type of windows size and which device, web is open in Mobile/Desktop.
 */
export default function useSystemInfo() {
    //Setting info variable default value as of current viewport resolution and device.
    const [info, setInfo] = useState<Array<boolean | number>>([window.screen.height, window.screen.width, !(/Mobile|iPhone|iPad|iPod|Android/i.test(navigator.userAgent))]);

    //To set resize value and current device type to info State this hook is used.
    //This hook Will be called whenever window screen is modified/resized manually.
    useEffect(() => {
        window.addEventListener("resize", () => {
            setInfo([window.screen.height,
            window.screen.width,
            !(/Mobile|iPhone|iPad|iPod|Android/i.test(navigator.userAgent))]);
        });
        return () => window.removeEventListener("resize", () => console.log('Resize Sucessfully unmounted!!'));
    }, []);

    const [height, width, desktopView] = info;

    return { height, width, desktopView };
}
