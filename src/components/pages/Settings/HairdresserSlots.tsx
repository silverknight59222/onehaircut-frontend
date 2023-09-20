import { dashboard } from "@/api/dashboard";
import { getLocalStorage } from "@/api/storage";
import react, { useEffect, useState } from "react";
import userLoader from "@/hooks/useLoader";
import useSnackbar from "@/hooks/useSnackbar";
import BaseMultiSelectbox from "@/components/UI/BaseMultiSelectbox";
interface HairdresserSlot {
  id: string;
  status: number;
  hair_dresser_id: number;
  available: boolean;
  day: string;
  end: string;
  start: string;
}
interface HairdressersWithSlots {
  id: number;
  hair_salon_id: number;
  profile_image: string | null;
  name: string;
  avatar: {
    image: string;
  };
  slots: HairdresserSlot[];
}

export const HairdresserSlots = () => {
  const { loadingView } = userLoader();
  const showSnackbar = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [hairDressers, setHairDressers] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState<HairdresserSlot>();
  const [hairdressersList, setHairdressersList] = useState<
    HairdressersWithSlots[]
  >([]);
  const defaultHairDresser = {
    id: 0,
    hair_salon_id: 0,
    profile_image: "",
    name: "-",
    avatar: {
      image: "",
    },
    slots: [
      {
        id: "",
        status: 0,
        hair_dresser_id: 0,
        available: false,
        day: "",
        end: "",
        start: "",
      },
    ],
  };
  const [selectedSalonHairDresser, setSelectedSalonHairDresser] =
    useState<HairdressersWithSlots>(defaultHairDresser);

  const getAllHairDresser = async () => {
    const user = getLocalStorage("user");
    const userId = user ? Number(JSON.parse(user).id) : null;
    if (userId) {
      setIsLoading(true);
      await dashboard.getAllHairDressers(userId).then((resp) => {
        if (resp.data.data.length) {
          setHairdressersList(resp.data.data);
          let hairdressers: any = [];
          resp.data.data.forEach((hairdresser: HairdressersWithSlots) => {
            hairdressers.push({ name: hairdresser.name });
          });
          setHairDressers(hairdressers);
        }
        setIsLoading(false);
      });
    }
  };
  const getSelectedHairdresser = (item: string) => {
    hairdressersList.forEach((hairdresser) => {
      if (hairdresser.name === item) {
        setSelectedSalonHairDresser(hairdresser);
      }
    });
  };

  const ChangeStatus = async () => {
    setIsLoading(true);
    let data: any = {};
    if (selectedSlot?.status === 1) {
      data.status = false;
    } else {
      data.status = true;
    }
    await dashboard
      .updateSalonSlot(Number(selectedSlot?.id), data)
      .then((resp) => {
        getAllHairDresser();
        setSelectedSlot(defaultHairDresser.slots[0]);
        setSelectedSalonHairDresser(defaultHairDresser);
        showSnackbar("success", resp.data.message);
      })
      .catch((err) => {
        showSnackbar("error", "Error Occured!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getAllHairDresser();
  }, []);

  return (
    <div>
      {isLoading && loadingView()}
      {!isLoading && (
        <div className="gap-7 w-full min-h-[700px]">
          <div className="block rounded-2xl border-2 border-gray-200 w-full h-full px-16 py-4">
            <div className="flex items-center justify-between my-2 w-full">
              <div>
                <BaseMultiSelectbox
                  dropdownItems={hairDressers}
                  dropdownTitle={"Select a hairdresser"}
                  getActiveFilters={getSelectedHairdresser}
                />
              </div>
              {selectedSalonHairDresser.id > 0 && (
                <div className="flex items-center justify-center rounded-2xl text-lg">
                  <p
                    onClick={() => ChangeStatus()}
                    className={`py-2 px-3 rounded-2xl  text-sm ${
                      selectedSlot
                        ? "bg-gradient-to-b from-pink-500 to-orange-500 text-white cursor-pointer"
                        : "bg-gray-200 text-black cursor-default"
                    }`}
                  >
                    Change Status
                  </p>
                </div>
              )}
            </div>
            {selectedSalonHairDresser.id ? (
              <div className="flex items-center justify-center gap-4 flex-wrap">
                {selectedSalonHairDresser.slots.map((slot, index) => {
                  return (
                    <div
                      key={index}
                      className={`flex items-center justify-center py-2 px-3 text-basefont-medium border-2 rounded-xl w-40 border-gray-200 cursor-pointer
            ${
              slot.status === 1
                ? "bg-[#FFE7DF] text-[#FF7143]"
                : "bg-white text-black"
            } ${
                        slot.id === selectedSlot?.id &&
                        "bg-gradient-to-b from-pink-500 to-orange-500 text-white"
                      }`}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      {slot.start} - {slot.end}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="w-[400px] my-16">
                The time slots of selected hairdresser will show here
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
