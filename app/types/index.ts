import { User, Reservation , Listing } from "@prisma/client";

export type SafeListing = Omit<
    Listing,
    "createdAt"
> & {
    createdAt: string;
}

export type SafeReservation = Omit<
  Reservation, 
  "createdAt" | "startDate" | "endDate" | "listing"
  //"createdAt" | "startDate" | "endDate" | "listing" | "user"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
  //user: SafeUser & { name: string }; // Include the user property with name
};

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};