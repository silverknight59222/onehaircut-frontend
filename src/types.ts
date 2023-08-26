import { HaircutDetails } from "./components/pages/dashboard/Dashboard/Hairstyles";

export type SalonDetails = {
	address: string;
	id: number;
	is_primary: 1;
	name: string;
	rating: number;
	type: string;
	user_id: number;
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
};

export type Haircut = {
	id: number;
	image: string;
	name: string;
	type: string;
	group?: EthnicGroup;
	length: string;
};

export type SalonHaircut = {
	id: number;
	image: string;
	name: string;
	type: string;
	group: EthnicGroup;
	length: string;
	salon_haircuts : HaircutDetails[];
}

export type EthnicGroup = {
	id: number;
	group: string;
}
interface Package {
	package: string;
}

export type Params = {
	params: Package;
}