import Image from "next/image";

export default function Page() {
  return (
    <div className="relative mx-auto mt-30 max-w-3xl">
      <h2 className="mb-10 text-center text-2xl leading-tight sm:mb-20">
        Nikos Trousis
      </h2>
      <div className="relative mx-auto aspect-[3/4] max-w-10/12 sm:float-right sm:mr-4 sm:mb-2 sm:w-72 sm:max-w-1/2">
        <Image
          src="https://drosinakis.app/static/sioux.jpg"
          fill
          alt="the photographer"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="">
        <p className="mx-auto max-w-10/12 pt-5 sm:pt-20">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
          vel possimus est, cupiditate ipsa, provident asperiores vitae culpa
          fugiat explicabo id, voluptatem expedita? Assumenda, quisquam itaque
          accusantium accusamus illum dolorem. Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Cum sit omnis corporis id voluptatum
          itaque enim deserunt esse perferendis consectetur? Amet animi
          doloremque similique nostrum eaque possimus delectus temporibus saepe.
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus
          incidunt sit perspiciatis accusantium illum ullam saepe reprehenderit
          nesciunt omnis eaque, velit facilis ducimus aperiam doloremque
          quibusdam, dignissimos explicabo minima sed? Lorem ipsum dolor sit,
          amet consectetur adipisicing elit. Quos officiis qui sequi, quisquam
          dolorum nihil quod facere quaerat similique nobis iure adipisci quasi
          ullam est eligendi voluptatem? Fuga, dignissimos eius?
        </p>
      </div>
    </div>
  );
}
