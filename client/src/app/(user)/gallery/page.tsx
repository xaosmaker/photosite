import PhotoCard from "@/components/PhotoCard";
export default function Page() {

const photos = [
  "https://drosinakis.app/static/pic1.jpeg",
  "https://drosinakis.app/static/pic2.jpeg",
  "https://drosinakis.app/static/pic3.jpeg",
  "https://drosinakis.app/static/pic4.jpeg",
  "https://drosinakis.app/static/pic5.jpeg",
  "https://drosinakis.app/static/pic6.jpeg",
  "https://drosinakis.app/static/pic7.jpeg",
  "https://drosinakis.app/static/pic8.jpeg",
  "https://drosinakis.app/static/pic9.jpeg",
];

  const list1: string[] = [];
  const list2: string[] = [];
  const list3: string[] = [];
  for (let i = 0; i < photos.length; i++) {
    if (i < 6) {
      list1.push(photos[i]);
    }

    if (i < 7) {
      list2.push(photos[i]);
    }
    if (i < 8) {
      list3.push(photos[i]);
    }
  }
  return (
    <div>
      <PhotoCard
        title="γαμος μαριας & γιαννης"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique enim recusandae quas eveniet expedita, beatae suscipit at doloremque distinctio, numquam perspiciatis quia corrupti ad necessitatibus voluptatibus temporibus cupiditate commodi voluptatem."
        photos={list1}
      />
      <PhotoCard
        title="φωτογραφια στην παραλια"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
        photos={list2}
      />
      <PhotoCard title="με τα παιδια" photos={list3} />
    </div>
  );
}

