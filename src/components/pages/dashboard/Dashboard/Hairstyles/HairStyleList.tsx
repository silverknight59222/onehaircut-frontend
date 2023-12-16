import React, { useEffect, useState } from 'react';
import { Theme_A } from "@/components/utilis/Themes";
import Image from "next/image";
import {
    CheckedIcon,
    SearcIcon,
    SelectedIcon,
    LoadingMoreArrow,
} from "@/components/utilis/Icons";
import { getLocalStorage } from "@/api/storage";
import { Haircut, SalonHaircut } from "@/types";
import { dashboard } from "@/api/dashboard";
import userLoader from "@/hooks/useLoader";
import HairStyleListItem from './HairStyleListItem';

let hairStyleParams = {}


const HairStyleList = React.memo(({ activeMenu, hairStyleSelectEvent, resetStyleForm, onFilterSelect, onReloadListener, selectAllListener, listCountShowEvent, setFinal }: any) => {
    // //console.log("in HairStyleList", hairStyleSelectEvent)

    const [haircutList, setHaircutList] = useState<Haircut[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState(false);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [removedItems, setRemovedItems] = useState<any>();
    const [selectedListItem, setSelectedListItem] = useState<any>([]);
    const { loadingView } = userLoader();
    let isPageLoading = false
    const [page, setPage] = useState(1);

    useEffect(() => {
        setFinal(selectedListItem)
    },[selectedListItem])

    const addItems = (selectedItem) => {

        if(selectedItem){
            const cpy = JSON.parse(JSON.stringify(selectedListItem)).concat([selectedItem])
            setSelectedListItem(cpy)
        }
    }

    const removeItems = (selectedItem) => {

        if(selectedItem){
            let items = JSON.parse(JSON.stringify(selectedListItem)).filter((e) => e.id !== selectedItem.id)
            setSelectedListItem(items)
        }
    }

    // useEffect(() => {
    //     console.log("Parents CB")
    //     if(selectedItems.length > 0){
    //         const cpy = JSON.parse(JSON.stringify(selectedListItem)).concat([selectedItems])
    //         setSelectedListItem(cpy)
    //         setSelectedItems([])
    //         console.log("cpy")
    //         console.log(cpy)
    //     }
    //     // setSelectedListItem(selectedListItem.concat([selectedItems]))
    // },[selectedItems])

    // useEffect(() => {
    //     console.log("Parents TB")
    //     let items = JSON.parse(JSON.stringify(selectedListItem)).filter((e) => e.id !== removedItems.id)
    //     setSelectedListItem(items)
    //     // let items = selectedListItem.filter((e) => e.id !== removedItems.id)
    //     // setSelectedListItem(items)
    // },[removedItems])


    useEffect(() => {
        if(isAllSelected){
            setSelectedListItem([])
            setSelectedListItem(haircutList)
        }
    },[isAllSelected])


    const getHaircuts = async (currentPage) => {
        setIsLoading(true);
        isPageLoading = true
        const id = Number(getLocalStorage("salon_id"));
        if (id) {
            dashboard.getAllHaircutBySalon(id, currentPage, activeMenu, hairStyleParams)
                .then((res) => {
                    resetStyleForm.on()
                    if (!res.data.data.length) {
                        setHaircutList([])
                    } else {
                        if (currentPage == 1) {
                            setHaircutList(prevData => res.data.data);
                            if (isAllSelected) {
                                hairStyleSelectEvent.on({
                                    type: "select_all",
                                    haircuts: res.data.data
                                })
                            }
                        } else {
                            setHaircutList(prevData => [...prevData, ...res.data.data]);
                            if (isAllSelected) {
                                hairStyleSelectEvent.on({
                                    type: "select_all",
                                    haircuts: [...haircutList, ...res.data.data]
                                })
                            }
                        }
                    }
                    listCountShowEvent.on(res.data.count)
                    if (res.data.count <= (currentPage * res.data.perPage)) {
                        setPage(-1)
                    } else {
                        setPage(currentPage + 1)
                    }
                })
                .finally(() => {
                    setIsLoading(false)
                    isPageLoading = false
                });
        }
    };

    const refreshDataWithPayload = (params) => {
        setFilters({ ...params })
        hairStyleParams = params
        reload()
    }

    const reload = async () => {
        setHaircutList([])
        getHaircuts(1);
    }

    const selectAllList = (value) => {
        if (value) {
            setIsAllSelected(true)
            hairStyleSelectEvent.on({
                type: "select_all",
                haircuts: haircutList
            })
            
        } else {
            hairStyleSelectEvent.on({
                type: "reset_modal"
            })
            setIsAllSelected(false)
            setSelectedListItem([])
        }
    }
    useEffect(() => {
        getHaircuts(page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        reload()
        hairStyleParams = {}
        setIsAllSelected(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeMenu])

    onFilterSelect.on = refreshDataWithPayload
    onReloadListener.on = reload
    selectAllListener.on = selectAllList

    // This component will re-render only if the `data` prop changes
    return (
        <div className='mb-5 pb-5'>
            {isLoading && loadingView()}
            <div className={`${Theme_A.behaviour.cardWindowBehaviour}`}>
                {haircutList.map((item, index) => {
                    return (
                        <>
                            <HairStyleListItem isAllSelected={isAllSelected} filters={filters} hairStyleSelectEvent={hairStyleSelectEvent} item={item} activeMenu={activeMenu} cB={addItems} tB={removeItems}></HairStyleListItem>
                        </>
                    );
                })}
            </div>
            {page != -1 && <div onClick={() => getHaircuts(page)} className={`text-center `}>
                <div className={`flex justify-center mt-4 mb-4 animate-bounce cursor-pointer hover:scale-110 `}>

                    <LoadingMoreArrow />
                </div>
                <p
                    className={`${Theme_A.Bars.proTopBar.standardShape2} `}
                >
                    CHARGER PLUS
                </p>
            </div>}
        </div>
    );
});

export default HairStyleList;