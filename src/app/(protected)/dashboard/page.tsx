"use client";
import { useUser } from "@clerk/nextjs";

const DashboardPage = () => {
  const { user } = useUser();
  console.log(user);
  return <div>{user?.emailAddresses[0]?.emailAddress}</div>;
};

export default DashboardPage;
