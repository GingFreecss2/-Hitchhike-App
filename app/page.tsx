import getCurrentUser from "./actions/getCurrentUser";
import getListings, {
  IListingsParams
} from "./actions/getListings";

import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

export const dynamic = 'force-dynamic'

interface HomeProps {
  searchParams: IListingsParams
};
const Home = async ( { searchParams }: HomeProps) => {
// export default async function Home() {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset/>
      </ClientOnly>
    );
  }

  // throw new Error('Something went wrong');

  return (
    <ClientOnly>
      <Container>
        <div className="
          pt-24
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        ">
          {listings.map((listing: any) => (
              <ListingCard 
                currentUser={currentUser}
                key={listing.id}
                data={listing}
              />
            )
          )}
        </div>
      </Container>
    </ClientOnly>
  )
}

export default Home;

// import { GetServerSideProps, GetServerSidePropsContext } from 'next';
// import ClientOnly from "./components/ClientOnly";
// import Container from "./components/Container";
// import EmptyState from "./components/EmptyState";
// import ListingCard from "./components/listings/ListingCard";
// import getCurrentUser from "./actions/getCurrentUser";
// import getListings, {
//   IListingsParams,
// } from "./actions/getListings";

// export const getProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
//   const searchParams: IListingsParams = {
//     userId: context.query.userId as string | undefined,
//     passengerCount: context.query.passengerCount as number | undefined,
//     doorCount: context.query.doorCount as number | undefined,
//     mileCount: context.query.mileCount as number | undefined,
//     startDate: context.query.startDate as string | undefined,
//     endDate: context.query.endDate as string | undefined,
//     locationValue: context.query.locationValue as string | undefined,
//     category: context.query.category as string | undefined,
//   };

//   const listings = await getListings(searchParams);
//   const currentUser = await getCurrentUser();

//   return { props: { listings, currentUser } };
// };

// export { getProps as getServerSideProps };


// const Home = ({ listings, currentUser }) => {
//   if (listings.length === 0) {
//     return (
//       <ClientOnly>
//         <EmptyState showReset />
//       </ClientOnly>
//     );
//   }

//   return (
//     <ClientOnly>
//       <Container>
//         <div className="pt-24
//             grid
//             grid-cols-1
//             sm:grid-cols-2
//             md:grid-cols-3
//             lg:grid-cols-4
//             xl:grid-cols-5
//             2xl:grid-cols-6
//             gap-8">
//           {listings.map((listing: any) => (
//             <ListingCard currentUser={currentUser} key={listing.id} data={listing} />
//           ))}
//         </div>
//       </Container>
//     </ClientOnly>
//   );
// };

// export default Home;

