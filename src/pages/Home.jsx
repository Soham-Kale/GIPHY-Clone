import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { GifState } from '../context/gif-context';
import Gif from "../components/Gif";
import FilterGif from "../components/FilterGif";

const Home = () => {
    const { gf, gifs, filter, setGifs } = GifState();
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const fetchTrendingGifs = async (pageNum = 1) => {
        const { data } = await gf.trending({
            limit: 20,  // Fetch 20 GIFs per page
            type: filter,
            rating: "g",
            offset: (pageNum - 1) * 20,  // Calculate the offset based on the page number
        });
        if (data.length === 0) {
            setHasMore(false);
        } else {
            setGifs(prevGifs => [...prevGifs, ...data]);  // Append new gifs to existing ones
        }
    };

    useEffect(() => {
        setGifs([]);  // Clear existing gifs on filter change
        setPage(1);    // Reset page number
        setHasMore(true);  // Reset the hasMore flag
        fetchTrendingGifs();  // Fetch gifs for the initial page
    }, [filter]);

    const fetchMoreGifs = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchTrendingGifs(nextPage);
    };

    const refreshGifs = () => {
        setPage(1);
        setGifs([]);
        fetchTrendingGifs();
    };

    return (
        <div>
            <img 
                src="/banner.gif"
                alt="earth banner" 
                className='mt-2 rounded w-full'
            />
            <FilterGif showTrending />
            <InfiniteScroll
                dataLength={gifs.length}
                next={fetchMoreGifs}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
                refreshFunction={refreshGifs}
                pullDownToRefresh
                pullDownToRefreshThreshold={50}
                pullDownToRefreshContent={
                    <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                }
                releaseToRefreshContent={
                    <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                }
                className='columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2'
            >
                {gifs.map((gif) => (
                    <Gif gif={gif} key={gif.title} />
                ))}
            </InfiniteScroll>
        </div>
    );
}

export default Home;
