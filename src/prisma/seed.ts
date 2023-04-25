import {PrismaClient} from '@prisma/client'
import regions from "../data/regions"
import cities from "../data/sities"

const prisma = new PrismaClient()

async function main() {
    for (const region of regions) {
        await prisma.region.upsert({
            where: {name: region.name},
            update: {},
            create: {
                name: region.name,
                geolocation:{
                    create:{
                        latitude: 1,
                        longitude: 1
                    }
                }
            }
        })
    }

    for (const city of cities) {
        await prisma.city.upsert({
            where: {name: city.name},
            update: {},
            create: {
                name: city.name,
                geolocation:{
                    create:{
                        latitude: city.latitude,
                        longitude: city.longitude
                    }
                },
                region: {
                    connect:{
                        id: Number(city.regionId)
                    }
                }
            }
        })
    }

    const transportTypes = ['Bus','Trolleybus','Tram','Subway','Route taxi']
    for (const transportType of transportTypes){
        await prisma.transportType.upsert({
            where: {name: transportType},
            update: {},
            create: {
                name: transportType
            }
        })
    }

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
