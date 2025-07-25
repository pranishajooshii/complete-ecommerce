import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingBag, Search, User, Heart } from "lucide-react";

const Collections = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main>
        {/* Hero Grid Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-auto lg:h-[600px]">
            {/* Handbag Offer */}
            <Card className="relative overflow-hidden group cursor-pointer bg-gradient-to-br from-rose-50 to-rose-100">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300" />
              <div className="relative h-full flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-52 h-24 bg-rose-200  mx-auto mb-4 flex items-end justify-end">
                    <img 
                      src="https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
                      alt="Handbag offer"
                      className="w-full h-full object-cover "
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">10% OFFER</h3>
                  <p className="text-sm text-gray-600 mb-4">ON SELECTED MODELS</p>
                  <Button className="bg-black text-white hover:bg-gray-800 px-6 py-2">
                    SHOP NOW
                  </Button>
                </div>
              </div>
            </Card>

            {/* New Collection - Large Card */}
            <Card className="relative overflow-hidden group cursor-pointer bg-gradient-to-br from-gray-100 to-gray-200 lg:row-span-2">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
              <div className="relative h-full flex flex-col justify-between p-8">
                <div>
                  <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">Warehouse</span>
                  <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">NEW<br />COLLECTION</h2>
                  <Button className="bg-black text-white hover:bg-gray-800 px-6 py-2">
                    SHOP NOW
                  </Button>
                </div>
                <div className="flex justify-end">
                  <img 
                    src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                    alt="New collection"
                    className="w-60 h-96  object-cover"
                  />
                </div>
              </div>
            </Card>

            {/* Hot Collection Women */}
            <Card className="relative overflow-hidden group cursor-pointer bg-gradient-to-br from-purple-50 to-purple-100">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300" />
              <div className="relative h-full flex flex-col justify-between p-8">
                <div>
                  <span className="inline-block bg-red-500 text-white text-xs font-bold px-2 py-1 rounded mb-2">HOT</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">WOMEN'S COLLECTION</h3>
                  <Button className="bg-black text-white hover:bg-gray-800 px-4 py-2 text-sm">
                    SHOP NOW
                  </Button>
                </div>
                <div className="flex justify-end">
                  <img 
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt="Women's collection"
                    className="w-20 h-28 rounded-lg object-cover"
                  />
                </div>
              </div>
            </Card>

            {/* Hot Collection Men */}
            <Card className="relative overflow-hidden group cursor-pointer bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300" />
              <div className="relative h-full flex flex-col justify-between p-8">
                <div>
                  <span className="inline-block bg-red-500 text-white text-xs font-bold px-2 py-1 rounded mb-2">HOT</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">MEN'S COLLECTION</h3>
                  <Button className="bg-black text-white hover:bg-gray-800 px-4 py-2 text-sm">
                    SHOP NOW
                  </Button>
                </div>
                <div className="flex justify-end">
                  <img 
                    src="https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
                    alt="Men's collection"
                    className="w-48 h-48 rounded-lg object-cover"
                  />
                </div>
              </div>
            </Card>

            {/* Handbag Offer */}
            <Card className="relative overflow-hidden group cursor-pointer bg-gradient-to-br from-rose-50 to-rose-100">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300" />
              <div className="relative h-full flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-24 h-24 bg-rose-200 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                      alt="Handbag offer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">10% OFFER</h3>
                  <p className="text-sm text-gray-600 mb-4">ON SELECTED MODELS</p>
                  <Button className="bg-black text-white hover:bg-gray-800 px-6 py-2">
                    SHOP NOW
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { 
                name: "Jackets", 
                color: "from-pink-100 to-pink-200",
                image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              },
              { 
                name: "Tops", 
                color: "from-blue-100 to-blue-200",
                image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
              },
              { 
                name: "Bags", 
                color: "from-green-100 to-green-200",
                image: "./images/handbag.jpg"
              },
              { 
                name: "Casual Wear", 
                color: "from-yellow-100 to-yellow-200",
                image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80"
              }
            ].map((category) => (
              <Card key={category.name} className={`relative overflow-hidden group cursor-pointer bg-gradient-to-br ${category.color} h-48 hover:scale-105 transition-transform duration-300`}>
                <img 
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300" />
                <div className="relative h-full flex items-center justify-center">
                  <h3 className="text-lg font-semibold text-gray-900 bg-white/80 px-4 py-2 rounded-lg">{category.name}</h3>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Collections;