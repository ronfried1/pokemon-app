import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FavoriteDocument = Favorite & Document;

@Schema({ timestamps: true })
export class Favorite extends Document {
  @Prop({ required: true, unique: true })
  pokemonId: number;

  @Prop({ required: true })
  name: string;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
