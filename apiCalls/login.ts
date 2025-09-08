import axiosInstance from "@/lib/axiosConfig";

type RandomUser = {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    city: string;
    country: string;
  };
  email: string;
  login: {
    uuid: string;
    username: string;
  };
  dob: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
};

type RandomUserResponse = {
  results: RandomUser[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
};

export async function login(): Promise<RandomUserResponse> {
  const response = await axiosInstance.get("/api", {
    params: {
      nat: "us",
      results: 1,
    },
  });

  return response.data;
}
