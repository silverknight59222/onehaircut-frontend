import React, { useEffect, useState } from "react";
import '@/components/shared/index.css'
import { CrossIcon } from "../utilis/Icons";
import { ColorsThemeA } from "../utilis/Themes";


const Pagination = ({ from, to, perPage, total, currentPage, lastPage, onPageChangeEvent }) => {

    const previousPage = () => {
        if (currentPage != 1) {
            onPageChangeEvent(currentPage - 1)
        }
    }

    const nextPage = () => {
        if (currentPage != lastPage) {
            onPageChangeEvent(currentPage + 1)
        }
    }

    const specificPage = (page) => {
        onPageChangeEvent(page)
    }

    const [pageList, setPageList] = useState([])

    useEffect(() => {
        const list = [] as any

        if (total < 10) {
            for (let i = 1; i <= total; i++) {
                list.push(i)
            }
        } else {
            if (currentPage <= 3 || currentPage > (lastPage - 3)) {
                list.push(...[1, 2, 3])
                list.push("...")
                for (let i = (lastPage - 2); i <= lastPage; i++) {
                    list.push(i)
                }
                //console.log(1);
            } else {
                list.push(1)
                list.push("...")
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    list.push(i)
                }
                list.push("...")
                list.push(lastPage)
            }
        }
        setPageList(list)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mb-5">
            <div className="flex flex-1 justify-between sm:hidden">
                <a onClick={previousPage} className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Previous
                </a>
                <a onClick={nextPage} className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Next
                </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing
                        <span className="font-medium mr-1 ml-1">{from}</span>
                        to
                        <span className="font-medium mr-1 ml-1">{to}</span>
                        of
                        <span className="font-medium  mr-1 ml-1">{total}</span>
                        results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <a onClick={previousPage} className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            <span className="sr-only">Previous</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                            </svg>
                        </a>
                        {pageList.map((item, index) => {
                            return (
                                <div key={index}>
                                    {item != "..." && item == currentPage && <a  aria-current="page" className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                        {item}
                                    </a>}
                                    {item != "..." && item != currentPage && <a onClick={() => { specificPage(item) }} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                        {item}
                                    </a>}
                                    {item == "..." && <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                                        ...
                                    </span>}
                                </div>
                            );
                        })}

                        <a onClick={nextPage} className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            <span className="sr-only">Next</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                            </svg>
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    );
};


export default Pagination;
