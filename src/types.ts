import { HaircutDetails } from "@/components/pages/dashboard/Dashboard/Hairstyles/HairStylesModal";

interface SalonImages{
	image: string,
	is_cover: boolean
}

export type Address = {
	id: number;
	city: string;
	state: string;
	country: string;
	lat: number | null;
	long: number | null;
}

export type SalonDetails = {
	haircut: {
		rating_counts: number,
		rating: number
	};
  salon_haircut?: {
    rating_counts: number,
    rating: number
  },
	address: Address;
	city_name: string;
	id: number;
	is_primary: 1;
	name: string;
	rating: number;
	type: string;
	user_id: number;
	logo: string;
	salon_images: SalonImages[],
	salon_cover_image: SalonImages | null,
	rating_counts: number,
	is_mobile:string,
	range: number[],
	base_price: number,
	service_price:number,
	final_price: number,
	openTimes: any[],
	chat_status: number,
	wishlist : number,
};

export type FileDetails = {
	lastModified: number;
	lastModifiedDate?: Date;
	name: string;
	size: number;
	type: string;
	webkitRelativePath: string;
};

export type AvatarType = {
	size: number;
	type: string;
};

export type Avatar = {
	id: number;
	image: string;
};

export type Hairdresser = {
	id: number;
	hair_salon_id: number;
	name: string;
	email: string;
	profile_image: string | null;
	avatar_id: number;
	avatar: Avatar | null,
	role: string,
	password: string;
};

export type ImageSalon = {
	id: number;
	image: string;
	type: string;
	is_cover: number;
};

type SalonHaircutRating = {
	id: number,
	rating : number,
	rating_counts : number,
	hair_salon_id : number,

};
export type Haircut = {
	id: number;
	image: string;
	name: string;
	type: string;
	group?: EthnicGroup;
	length: string;
	is_added_to_wishlist: boolean
	is_ever_generated: boolean
	salon_haircuts?: HaircutDetails[]
};

export type WishlistHaircuts={
	haircut: Haircut
}

export type SalonWishlist={
	hairsalon: SalonDetails
}

export type SalonHaircut = {
	id: number;
	image: string;
	name: string;
	type: string;
	group: EthnicGroup;
	length: string;
	is_added_to_wishlist: boolean;
	salon_haircuts : HaircutDetails[];
}

export type EthnicGroup = {
	id: number;
	group: string;
}

interface Color{
	id: string,
	color: string
}

export type Services={
    length: string;
	id: number
	name: string,
	description: string,
	type: string,
	colors: Color[],
	requirements: string[]
}

export type Slot={
  is_booked: any;
	id: number,
	start: string
}

export type Chat={
	message: string,
	by: string,
	created_at: string,
	is_read: number
}

interface Client{
	name: string,
	front_profile: string
}

export type ClientChat={
	id?: number,
	client_id: number,
	client: Client,
	is_read: number,
}

export type Subscription={
	created_at: string,
	current_period_end: string,
	ends_at: string|null,
	id: number,
	items: any,
	name: string,
	owner: any,
	quantity: number,
	stripe_id: string,
	stripe_price: string,
	stripe_status: string,
	trial_ends_at: string | null,
	updated_at: string,
	user_id: number,
	readable_trial_period:string
}

export type BankAccountStripe = {
	name : string,
	owner : string,
	bank_name : string,
	business_type : string,
	iban : string,
	currency : string,
}