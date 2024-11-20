function useDebounceFn<T extends noop>(fn: T, options?: DebounceOptions) {

    const fnRef = useRef(fn);
    ref.current = fn;
  
    const wait = options?.wait ?? 1000;
  
    const debounced = useMemo(
      () =>
        debounce(
          (...args: Parameters<T>): ReturnType<T> => {
            return fnRef.current(...args);
          },
          wait,
          options,
        ),
      [],
    );
  
    useEffect(()=>() =>  debounced.cancel(),[]);
  
    return {
      run: debounced,
      cancel: debounced.cancel,
      flush: debounced.flush,
    };
  }