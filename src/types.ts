import { HaircutDetails } from "./components/pages/dashboard/Dashboard/Hairstyles";

interface SalonImages{
	image: string,
	is_cover: boolean
}

export type Address = {
	id: number;
	city: string;
	state: string;
	country: string;
}

export type SalonDetails = {
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
	salon_cover_image: SalonImages,
	ratings_count: number,
	is_mobile:string,
	range: number[],
	base_price: number,
	service_price:number,
	final_price: number
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
	avatar: Avatar,
	role: string,
	password: string | null;
};

export type ImageSalon = {
	id: number;
	image: string;
	type: string;
	is_cover: number;
};

export type Haircut = {
	id: number;
	image: string;
	name: string;
	type: string;
	group?: EthnicGroup;
	length: string;
	is_added_to_wishlist: boolean
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
	is_added_to_wishlist: boolean
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
	id: number
	name: string,
	description: string,
	type: string,
	colors: Color[],
	requirements: string[]
}

export type Slot={
	id: number,
	start: string
}

export type Chat={
	message: string,
	by: string,
	created_at: string,
}

interface Client{
	name: string
}

export type ClientChat={
	id?: number,
	client_id: number,
	client: Client
}