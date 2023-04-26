import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import sanityClient, { urlFor } from "../sanity";

export default function CategoryCard({ imgUrl, title }) {
  return (
    <TouchableOpacity className="relative mr-2 ">
      <Image
        source={{
          uri: imgUrl,
        }}
        className="h-20 w-20 rounded-full"
      />
      <Text className=" bottom-1 left-1 text-black p-3 font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
