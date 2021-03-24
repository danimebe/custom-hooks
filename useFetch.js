import { useEffect, useRef, useState } from 'react';

export const useFetch = (url) => {
	const [ state, setState ] = useState({ data: null, loading: true, error: null });

	let isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, []);


	useEffect(
		() => {
			setState({
				...state,
				loading: true
			})
			fetch(url).then((resp) => resp.json()).then((data) => {
					isMounted.current && setState({
						loading: false,
						error: false,
						data
					});
			})
			.catch(error => {
				isMounted.current && setState({
					data: null,
					error: 'No se pudo cargar la data',
					loading: false
				})
			});
		},
		[ url ]
	);

	return state;
};
