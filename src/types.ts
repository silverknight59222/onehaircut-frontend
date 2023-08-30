import { HaircutDetails } from "./components/pages/dashboard/Dashboard/Hairstyles";

export type SalonDetails = {
	address: string;
	id: number;
	is_primary: 1;
	name: string;
	rating: number;
	type: string;
	user_id: number;
	logo: string
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