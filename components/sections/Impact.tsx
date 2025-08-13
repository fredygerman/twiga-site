import { Badge } from "@/components/ui/badge";

export default function Impact() {
  return (
    <section id="about" className="py-20 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8">
            Trusted by Tanzanian Educators
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-green-700 mb-2">500+</div>
              <p className="text-slate-600">Teachers already onboard</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-green-700 mb-2">100%</div>
              <p className="text-slate-600">
                Designed for Tanzanian classrooms
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-green-100">
            <p className="text-lg text-slate-700 mb-4">
              "Twiga uses retrieval-augmented generation (RAG) to combine the
              adaptive capabilities of LLMs with knowledge from the Tanzanian
              Institute of Education curriculum and textbooks."
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Tanzania AI Community
              </Badge>
              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-800"
              >
                Open Source
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
