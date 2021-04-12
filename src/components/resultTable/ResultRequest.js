import React from 'react'
import axios from 'axios'
import useSWR from 'swr'

const fetcher = async (url) =>
  await axios(url, {
    method: 'GET',
    headers: {
      //'Content-Type': 'application/json',
    }
  }).then((res) => res.data)

/*{
    const fetchData = async (url) => {
        const result = await axios(url,).then(res => res.data);
    }

    fetchData(url);

}*/

export default function ResultRequest(props) {
  fetch('/api/v2/assignment', {
    headers: {
      'content-type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then((data) => {
      props.setFetchData({ data })
    })
  /*
    const {data, error} = useSWR('/api/v2/assingment',fetcher,
        {
            refreshInterval: 1000,
        }
    );

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    if (data) console.log(data);

    return (
        <div>
            Complete
        </div>
    )
    */
}
