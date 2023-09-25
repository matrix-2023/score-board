import { useEffect, useRef } from "react";

const usePreviousValue = (value: any) => {
    const prevChildrenRef = useRef();

    useEffect(() => {
        prevChildrenRef.current = value;
    }, [value]);

    return prevChildrenRef.current;
};

export default usePreviousValue;