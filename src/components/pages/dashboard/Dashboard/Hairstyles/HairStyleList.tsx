import React, { useEffect, useState } from 'react';
import { Theme_A } from "@/components/utilis/Themes";
import Image from "next/image";
import {
    CheckedIcon,
    SearcIcon,
    SelectedIcon,
} from "@/components/utilis/Icons";
import { getLocalStorage } from "@/api/storage";
import { Haircut, SalonHaircut } from "@/types";
import { dashboard } from "@/api/dashboard";
import userLoader from "@/hooks/useLoader";
import HairStyleListItem from './HairStyleListItem';

let hairStyleParams = {}


const HairStyleList = React.memo(({ activeMenu, hairStyleSelectEvent, resetStyleForm, onFilterSelect, onReloadListener }: any) => {
    // console.log("in HairStyleList", hairStyleSelectEvent)

    const [haircutList, setHaircutList] = useState<Haircut[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState(false);
    const { loadingView } = userLoader();
    let isPageLoading = false
    const [page, setPage] = useState(1);

    const selectHaircut = (item: Haircut) => {
        let added = false;
        // selectedHaircutsMapping.map((haircut) => {
        //     if (haircut.id === item.id) {
        //         setSelectedHaircutsMapping(
        //             selectedHaircutsMapping.filter((item) => item.id !== haircut.id)
        //         );
        //         added = true;
        //     }
        // });
        // if (!added) {
        //     setSelectedHaircutsMapping((prev) => [...prev, item]);
        // }
    };

    const selectSalonHaircut = (index: number) => {
        // if (salonHaircutList.length) {
        //     salonHaircutList.map((haircut, i) => {
        //         if (i === index) {
        //             setSelectedSalonHaircut(haircut);
        //             setForm(haircut.salon_haircuts[0]);
        //         }
        //     });
        // }
    };

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
                        } else {
                            setHaircutList(prevData => [...prevData, ...res.data.data]);
                        }
                    }
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
        setFilters({...params})
        hairStyleParams = params
        reload()
    }

    const reload = async () => {
        setHaircutList([])
        getHaircuts(1);
    }

    useEffect(() => {
        getHaircuts(page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        reload()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeMenu])

    onFilterSelect.on = refreshDataWithPayload
    onReloadListener.on = reload

    // This component will re-render only if the `data` prop changes
    return (
        <div className='mb-5 pb-5'>
            {isLoading && loadingView()}
            <div className={`${Theme_A.behaviour.cardWindowBehaviour}`}>
                {haircutList.map((item, index) => {
                    return (
                        <>
                           <HairStyleListItem filters={filters} hairStyleSelectEvent={hairStyleSelectEvent} item={item} activeMenu={activeMenu}></HairStyleListItem>
                        </>
                    );
                })}
            </div>
            {page != -1 && <div onClick={() => getHaircuts(page)} className={`text-center `}>
                <p
                    className={`${Theme_A.Bars.proTopBar.standardShape}`}
                >
                    CHARGER PLUS
                </p>
            </div>}
        </div>
    );
});

export default HairStyleList;