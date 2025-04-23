import { Badge } from "@/components/ui/badge";
import { typeColors } from "@/lib/utils";
import { PokemonAbility } from "@/types/details-pokemon";

export default function PokemonHeader({
  name,
  id,
  types,
  description,
  height,
  weight,
  baseExperience,
  abilities,
}: {
  name: string;
  id: number;
  types: string[];
  description: string;
  height: number;
  weight: number;
  baseExperience: number;
  abilities: PokemonAbility[];
}) {
  return (
    <div className="p-4 md:p-6 bg-card">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl md:text-2xl font-bold capitalize text-card-foreground">
          {name}
        </h1>
        <span className="text-lg md:text-xl font-bold px-3 py-1 rounded-full bg-muted text-muted-foreground">
          #{id}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {types?.map((type: string) => (
          <Badge
            key={type}
            className={`${typeColors[type]} text-white px-3 py-1`}
          >
            {type}
          </Badge>
        ))}
      </div>

      {description && (
        <p className="text-card-foreground/90 mb-6 bg-muted/50 p-3 rounded-lg border border-border text-sm md:text-base">
          {description}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        <div>
          <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base text-card-foreground/90">
            Height
          </h3>
          <p className="text-base md:text-lg bg-muted/50 p-2 rounded-lg border border-border">
            {height} m
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base text-card-foreground/90">
            Weight
          </h3>
          <p className="text-base md:text-lg bg-muted/50 p-2 rounded-lg border border-border">
            {weight} kg
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base text-card-foreground/90">
            Base Experience
          </h3>
          <p className="text-base md:text-lg bg-muted/50 p-2 rounded-lg border border-border">
            {baseExperience}
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base text-card-foreground/90">
            Skills
          </h3>
          <p className="text-base md:text-lg bg-muted/50 p-2 rounded-lg border border-border truncate">
            {abilities
              ?.map((ability: PokemonAbility) => ability.ability.name)
              .join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}
