import {PrismaClient} from '@prisma/client'
import regions from "../data/regions"
import cities from "../data/sities"
import {hasPassword} from "../utils/CryptoHelper";

const prisma = new PrismaClient()

async function main() {
    for (const region of regions) {
        const i = region.id + 1
        await prisma.region.upsert({
            where: {name: region.name},
            update: {},
            create: {
                name: region.name,
                geolocation:{
                    create:{
                        latitude: i,
                        longitude: i
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


    await prisma.account.upsert({
        where: {username: 'admin'},
        update: {},
        create: {
            username: 'admin',
            email: 'admin@city-transport.in.ua',
            password: await hasPassword('admin'),
            role: 'ADMIN'
        }
    })
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
