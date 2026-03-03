import React from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Calendar, Users, Ticket, ArrowRight } from 'lucide-react';

function Home() {
  return (
      <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white text-gray-900 flex flex-col">
        <section className="relative flex flex-col items-center justify-center text-center px-6 py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-white"></div>

          <div className="relative w-full max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1 mb-6 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-full">Evenimentele tale preferate</span>

            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-gray-900">
              Descoperă evenimentele care contează
            </h2>

            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
              Concerte, cluburi, teatru, totul într-un singur loc. Cumpără bilete, urmărește organizatorii preferați și rămâi la curent cu cele mai tari evenimente din orașul tău.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button className="w-full sm:w-56 text-base font-medium py-6 cursor-pointer bg-indigo-600 hover:bg-indigo-700 transition-all">
                  <span>Începe acum</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/events" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-56 text-base py-6 cursor-pointer border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all">
                  Vezi evenimente
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-8 mt-16">
              <div className="flex items-center">
                <div className="rounded-full bg-indigo-100 p-2 mr-3">
                  <Calendar className="h-5 w-5 text-indigo-700" />
                </div>
                <span className="font-medium text-gray-700">1000+ evenimente</span>
              </div>
              <div className="flex items-center">
                <div className="rounded-full bg-indigo-100 p-2 mr-3">
                  <Users className="h-5 w-5 text-indigo-700" />
                </div>
                <span className="font-medium text-gray-700">200+ organizatori</span>
              </div>
              <div className="flex items-center">
                <div className="rounded-full bg-indigo-100 p-2 mr-3">
                  <Ticket className="h-5 w-5 text-indigo-700" />
                </div>
                <span className="font-medium text-gray-700">Bilete instant</span>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-24 text-center bg-white">
          <div className="max-w-6xl mx-auto">
            <span className="inline-block px-4 py-1 mb-4 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-full">Serviciile noastre</span>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Ce oferim</h3>
            <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
              Platforma noastră face procesul de descoperire și participare la evenimente mai simplu și mai eficient ca niciodată.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all group  hover:scale-105">
                <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto mb-6 group-hover:bg-indigo-200 transition-colors">
                  <Users className="h-7 w-7 text-indigo-700" />
                </div>
                <h4 className="text-xl font-semibold mb-4 text-gray-900">Organizatori locali</h4>
                <p className="text-gray-600">
                  Colaborăm cu promoteri, artiști și organizatori de evenimente reale din comunitatea ta. Vei găsi evenimente relevante, nu reclame impersonale. Vrei să organizezi ceva? Îți oferim toate instrumentele ca să te faci cunoscut rapid.
                </p>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <Link href="/partners" className="text-indigo-600 font-medium flex items-center justify-center hover:text-indigo-800 transition-colors">
                    Descoperă organizatori
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all group  hover:scale-105">
                <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto mb-6 group-hover:bg-indigo-200 transition-colors">
                  <Ticket className="h-7 w-7 text-indigo-700" />
                </div>
                <h4 className="text-xl font-semibold mb-4 text-gray-900">Platformă intuitivă și rapidă</h4>
                <p className="text-gray-600">
                  Am creat o experiență de utilizare cât mai simplă: filtre clare, categorii bine definite, cumpărare de bilete în câteva clickuri și acces instant la evenimentele tale favorite. E rapid, comod și fără bătăi de cap.
                </p>
                <div className="mt-12 pt-6 border-t border-gray-100">
                  <Link href="/events" className="text-indigo-600 font-medium flex items-center justify-center hover:text-indigo-800 transition-colors">
                    Vezi evenimente
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-24 bg-gradient-to-b from-white to-indigo-50">
          <div className="max-w-6xl mx-auto text-center">
            <span className="inline-block px-4 py-1 mb-4 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-full">Pentru toate gusturile</span>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Explorează evenimente după categorie</h3>
            <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
              De la concerte și festivaluri, la piese de teatru și expoziții - avem totul acoperit.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-indigo-300 transition-all hover:shadow-md  hover:scale-105">
                <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-900">Concerte & Muzică</h4>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-indigo-300 transition-all  hover:shadow-md  hover:scale-105">
                <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-900">Teatru & Artă</h4>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-indigo-300 transition-all  hover:shadow-md  hover:scale-105">
                <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-indigo-700" />
                </div>
                <h4 className="font-medium text-gray-900">Networking</h4>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-indigo-300 transition-all  hover:shadow-md  hover:scale-105">
                <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-6 w-6 text-indigo-700" />
                </div>
                <h4 className="font-medium text-gray-900">Festivaluri</h4>
              </div>
            </div>
            <Link href="/events" className="w-full sm:w-auto">
            <Button variant="outline" className="cursor-pointer mt-10 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-indigo-300">
              Vezi toate categoriile
            </Button>
            </Link>
          </div>
        </section>
      </main>
  );
}

export default Home;