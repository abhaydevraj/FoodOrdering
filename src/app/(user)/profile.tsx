import { supabase } from "@/src/lib/supabase";
import React from "react";
import { Button, Text, View } from "react-native";

const profileScreen = () => {
  return (
    <View>
      <Text>profile</Text>
      <Button
        title="Sign Out"
        onPress={async () => await supabase.auth.signOut()}
      />
    </View>
  );
};

export default profileScreen;
