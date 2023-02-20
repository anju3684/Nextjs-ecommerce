import { NextRouter, Router } from "next/router";

type Props={
    page?:number| string;
    category?:string;
    router:NextRouter;
    sort?:string;
    search?:string;

}
const filterSearch = ({router, page, category, sort, search}:Props) => {

    const path = router.pathname;
    const query = router.query;
   

    if(category) query.category = category;
    if(page) (query.page) = page.toString();
    if(search) query.search = search;
    if(sort) query.sort = sort;

    router.push({
        pathname: path,
        query: query
    })
}

export default filterSearch