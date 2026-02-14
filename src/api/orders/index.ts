import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

export const useAdminOrdersList = ({ archived }: { archived: boolean }) => {
  const statuses = archived ? ["Delivered"] : ["New", "Cooking", "Delivering"];
  return useQuery({
    queryKey: ["orders", { archived }],
    queryFn: async () => {
      //  console.log("Fetching products from database...");
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .in("status", statuses);

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useMyOrdersList = () => {
  const { session } = useAuth();
  const id = session?.user.id;
  if (!session) {
    throw new Error("User is not authenticated");
  }
  return useQuery({
    queryKey: ["orders", { user_id: id }],
    queryFn: async () => {
      if (!id) {
        throw new Error("User ID is not available");
      }
      //  console.log("Fetching products from database...");
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", id);

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};
