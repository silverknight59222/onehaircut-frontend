import { CrossIcon } from "@/components/utilis/Icons";
import useSnackbar from "@/hooks/useSnackbar";
import userLoader from "@/hooks/useLoader";
import React from "react";
import { Booking } from ".";
interface BookingDetail {
  event: Booking;
  setModal: (value: Booking) => void;
}
const AddServiceModal = (props: BookingDetail) => {
  const defaultBooking = {
    id: "",
    title: "",
    start: "",
  };

  return (
    <div className="relative bg-white lg:min-w-[550px] min-h-[300px]  rounded-xl px-5 pb-5">
      <div className="w-full flex items-center justify-end pt-2">
        <div
          className="absolute -right-3 -top-7 cursor-pointer my-3 py-2 px-3 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 shadow-[0px_14px_24px_0px_rgba(255,125,60,0.25)]"
          onClick={() => props.setModal(defaultBooking)}
        >
          <CrossIcon width="16" />
        </div>
      </div>
      <div className="flex w-full items-center justify-center text-xl font-semibold flex-col gap-4 min-h-[300px]">
        <div>Name: {props.event.title}</div>
        <div>Date: {props.event.start.split('T')[0]}</div>
      </div>
    </div>
  );
};

export default AddServiceModal;
