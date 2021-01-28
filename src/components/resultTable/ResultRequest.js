import React from 'react';
import axios from 'axios';
import useSWR from 'swr';

const fetcher = async (url) => await axios(url).then(res => res.data);

/*{
    const fetchData = async (url) => {
        const result = await axios(url,).then(res => res.data);
    }

    fetchData(url);

}*/


export default function ResultRequest(props) {

    /*
    const [data, setData] = useState(
        {
            hits: [],
        }
    );*/

    const {data, error} = useSWR('https://hn.algolia.com/api/v1/search?query=redux',fetcher,
        {
            refreshInterval: 1000,
        }
    );

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    /*
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
              'https://hn.algolia.com/api/v1/search?query=redux',
            );
       
            setData(result.data);
          };
       
        fetchData();
    }, []);
    */

    return (
        <ul>
            {data.hits.map(item => (
                <li key={item.objectID}>
                <a href={item.url}>{item.title}</a>
                </li>
            ))}
        </ul>
    )
}
