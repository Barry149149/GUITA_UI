import React from 'react';
import axios from 'axios';
import useSWR from 'swr';

const fetcher = async (url) => await axios(url, {
    method:'GET',
    headers: {
        'Content-Type': 'application/json',
    }
}).then(res => res.data);

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

    const {data, error} = useSWR('https://en8ubg2ol35lj.x.pipedream.net',fetcher,
        /*{
            refreshInterval: 1000,
        }*/
    );

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    if (data) console.log(data);
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
        <div>
            Complete
        </div>
    )
}
