import Image from "next/image";

const AboutSection = () => {
    return (
        <div className=" container mx-auto  border-white rounded-3xl mt-10 ">
             <div className="w-full min-h-[55vh] rounded-4xl shadow-rose-100  shadow-2xl">
        {/* header */}
        <header className="flex h-full lg:flex-row flex-col gap-[50px] lg:gap-0 justify-center items-center lg:mt-3 py-6">
          <div className="px-8 mt-8 lg:mt-0 w-full lg:w-[50%]">
            <h1 className="text-[40px] lg:text-[40px] leading-[45px] lg:leading-[55px] font-[500]">
              What 's <span className="text-rose-500 font-semibold">Medi<span className="text-primary font-semibold">Mart</span></span> 
            </h1>
            <p className="text-[16px] mt-2">
            <span className="text-rose-500 font-semibold">Medi<span className="text-primary font-semibold">Mart</span></span>  is the very first premium online medicine brand manufactured in
              Bangladesh. The brand is owned by Meghna, the number 1 premium
              medicine manufacturer in South Asia. MediMart started its journey back
              in 2014 to provide affordable premium medicine for patient, while maintaining all European ISO standards that
              Meghna learnt from the experiences in exporting medicine to Europe.
              The brand started small, with selling only few hundred units per
              month back in 2014
            </p>
          </div>

          {/* image */}
          <div className="w-full lg:w-[50%] object-cover p-10">
            <Image
              src='/images/img/us1.png'
              alt="image"
              width={300}
              height={200}
              className="w-full h-full rounded-4xl"
            />
          </div>
        </header>
      </div>
      <div className="w-full min-h-[55vh] rounded-4xl shadow-rose-100 shadow-2xl">
        {/* header */}
        <header className="flex h-full lg:flex-row flex-col gap-[50px] lg:gap-0 justify-center items-center lg:mt-3 py-6">
          {/* image */}
          <div className="w-full lg:w-[50%] object-cover p-10">
            <Image
              src='/images/img/us2.png'
              alt="image"
              width={300}
              height={200}
              className="w-full h-full rounded-4xl"
            />
          </div>
          <div className="px-8 mt-8 lg:mt-0 w-full lg:w-[50%]">
            <h1 className="text-[40px] lg:text-[40px] leading-[45px] lg:leading-[55px] font-[500]">
            <span className="text-rose-500 font-semibold">Medi<span className="text-primary font-semibold">Mart</span></span> Market Position
            </h1>
            <p className="text-[16px] mt-2">
            <span className="text-rose-500 font-semibold">Medi<span className="text-primary font-semibold">Mart</span></span>  Currently, is the most well known medicine brand in
              Bangladesh, and one of the few medicine brands catering to the
              premium medicine segment in Bangladesh with over 80% market share.
              MediMart  has reached the global market starting with India in
              2020, currently expanding distribution networks in India and
              surrounding countries in the region.
            </p>
          </div>
        </header>
      </div>
        </div>
    );
};

export default AboutSection;