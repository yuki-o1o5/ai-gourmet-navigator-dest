import { Card, CardContent, CardTitle, CardDescription } from './ui/card'
import { FavoriteButton } from './favorite-button'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { StarIcon } from '@radix-ui/react-icons'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

import Link from 'next/link'

interface InfoWindowCard {
  placeId: string
  name: string
  imageUrls: string[]
  rating: number
  ratingsTotal: number
  isFavorite: boolean
  isMap?: boolean
}

export function InfoWindowCard({
  placeId,
  name,
  imageUrls,
  rating,
  ratingsTotal,
  isFavorite,
  isMap,
}: InfoWindowCard) {
  const { status } = useSession()
  return (
    <Link href={`/restaurant-detail/${placeId}`}>
      <Card className={`${isMap ? 'max-w-80' : 'max-w-[384px]'}`}>
        <Carousel className="w-full">
          <CarouselContent>
            {imageUrls.map((photo, index) => (
              <CarouselItem key={`${photo}-${index}`}>
                <div className="flex items-center justify-center">
                  <Image
                    className={`w-[384px] rounded-t-lg object-cover pb-4 ${isMap ? 'h-[230px]' : 'h-[320px] sm:h-[320px] md:h-[260px]'}`}
                    src={photo}
                    width={0}
                    height={0}
                    sizes="100vh"
                    alt={`${name}-image`}
                    priority
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 transform" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 transform" />
        </Carousel>

        <CardContent>
          <div className="flex items-center justify-between">
            <CardTitle>{name}</CardTitle>
            {status === 'authenticated' && (
              <FavoriteButton isFavorite={isFavorite} placeId={placeId} />
            )}
          </div>
          <div className="flex items-center">
            <StarIcon />
            <CardDescription>{`${rating} (${ratingsTotal})`}</CardDescription>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
