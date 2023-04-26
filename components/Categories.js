import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";

import sanityClient, { urlFor } from "../sanity";
import CategoryCard from "./CategoryCard";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "jobCategory"]
    `
      )
      .then((data) => {
        setCategories(data);
      });
  }, []);

  return (
    <ScrollView
      horizontal
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      showsHorizontalScrollIndicator={false}
    >
      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          imgUrl={urlFor(category.image).width(200).url()}
          title={category.title}
        />
      ))}
    </ScrollView>
  );
}
