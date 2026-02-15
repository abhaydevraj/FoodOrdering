import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { InsertTables, UpdateTables } from "@/src/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
        .eq("user_id", id)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useOrderDetails = (id: number) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*, products(*))")
        .eq("id", id)
        .single();

      if (error) {
        throw new Error(error.message || JSON.stringify(error));
      }
      return data;
    },
  });
};

export const useInsertOrder = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const user_id = session?.user.id || null; // Set to null if user is not authenticated

  return useMutation({
    async mutationFn(data: InsertTables<"orders">) {
      //  console.log("Inserting order into database...", data);
      const { error, data: newProduct } = await supabase
        .from("orders")
        .insert({ ...data, user_id: user_id })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
    async onSuccess() {
      // Invalidate and refetch
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError(error) {
      console.error("Error inserting product:", error);
    },
  });
};

export const useUpdateorder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn({
      id,
      updatedFields,
    }: {
      id: number;
      updatedFields: UpdateTables<"orders">;
    }) {
      //  console.log("Inserting product into database...", data);
      const { error, data: updatedOrder } = await supabase
        .from("orders")
        .update(updatedFields)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return updatedOrder;
    },
    async onSuccess(_, { id }) {
      // Invalidate and refetch
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
      await queryClient.invalidateQueries({ queryKey: ["orders", id] });
    },
    onError(error) {
      console.error("Error updating product:", error);
    },
  });
};
