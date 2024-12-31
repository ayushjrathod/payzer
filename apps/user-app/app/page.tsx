// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import { authOptions } from "../lib/auth";

// export default async function Page() {
//   const session = await getServerSession(authOptions);
//   if (session?.user) {
//     redirect("/dashboard");
//   } else {
//     redirect("/api/auth/signin");
//   }
// }
export default async function Page() {
  return <div className="bg-red-600">Hello World</div>;
}
