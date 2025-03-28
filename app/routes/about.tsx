import { useLoaderData } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { fetchAboutData } from '~/lib/mocks';


export const loader = async () => {
  const { teamMembers } =await fetchAboutData();
  return ({ teamMembers });
};

const AboutPage =() => {
  const {teamMembers} = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-24">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
              <p className="text-xl mb-8">Redefining e-commerce with style, innovation, and exceptional customer experience.</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-black opacity-20"></div>
        </section>

        {/* Our Mission */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600">
                At Remi-x-commerce, we&apos;re on a mission to transform the way people shop online. We believe in creating a shopping experience that&apos;s not just about transactions, but about connection, discovery, and delight. We curate products that inspire, innovate, and improve lives, while building a community that values quality, sustainability, and exceptional service.
              </p>
            </div>
          </div>
        </section>

        {/* Our Journey */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/3">
                    <img src="https://dummyjson.com/icon/emilys/128" alt="2018 - The Beginning" className="rounded-lg shadow-md w-full" />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold mb-3">2018 - The Beginning</h3>
                    <p className="text-gray-600">
                      Remi-x-commerce started as a small online boutique with a carefully curated collection of unique products. Founded by Emma Reynolds, our initial focus was on sustainable fashion and home goods.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                  <div className="md:w-1/3">
                    <img src="https://dummyjson.com/icon/emilys/128" alt="2020 - Expansion" className="rounded-lg shadow-md w-full" />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold mb-3">2020 - Expansion</h3>
                    <p className="text-gray-600">
                      As our community grew, so did our product range. We expanded into electronics, beauty, and more categories, all while maintaining our commitment to quality and customer satisfaction.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/3">
                    <img src="https://dummyjson.com/icon/emilys/128" alt="2023 - Innovation" className="rounded-lg shadow-md w-full" />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold mb-3">2023 - Innovation</h3>
                    <p className="text-gray-600">
                      We launched our mobile app and implemented personalized shopping experiences powered by cutting-edge technology. This year also marked the beginning of our international shipping program.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                  <div className="md:w-1/3">
                    <img src="https://dummyjson.com/icon/emilys/128" alt="2025 - Today" className="rounded-lg shadow-md w-full" />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold mb-3">2025 - Today</h3>
                    <p className="text-gray-600">
                      Today, Remi-x-commerce serves millions of customers worldwide with a team of passionate individuals who are dedicated to creating the best online shopping experience possible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Innovation</h3>
                  <p className="text-gray-600">We constantly seek new ways to improve our platform and provide cutting-edge solutions for our customers.</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Quality</h3>
                  <p className="text-gray-600">We rigorously vet all products to ensure they meet our high standards for craftsmanship and durability.</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Customer-Centric</h3>
                  <p className="text-gray-600">Our customers are at the heart of everything we do. We&apos;re committed to providing exceptional service at every touchpoint.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Meet the Team */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Meet the Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <Card key={member.id} className="overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-64 object-cover"
                  />
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-purple-600 mb-3">{member.position}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
              <p className="text-lg text-gray-600 mb-8">
                Have questions about our products or want to collaborate? We&apos;d love to hear from you!
              </p>
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">Contact Us</Button>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
};

export default AboutPage;