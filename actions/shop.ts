"use server";

import type { ShopFormValues } from "@/app/app/(offboarded)/onboarding/page";
import { prisma } from "@/db";
import { auth } from "@/lib/auth";
import { nanoid } from "nanoid";
import { headers } from "next/headers";

export async function getShop(id: string) {
  return await prisma.shop.findUnique({
    where: {
      id,
    },
  });
}

export async function createShop(shop: ShopFormValues) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return { success: false, error: "Unauthorized" };
    }

    await prisma.shop.create({
      data: {
        slug: generateShopSlug(shop.name),
        name: shop.name,
        logo: shop.logo,
        description: shop.description,
        userId: session.user.id,
        images: shop.images,
        lineLink: shop.lineLink,
        googleMapLink: shop.googleMapLink,
        phoneNumber: shop.phoneNumber,
      },
    });

    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

function generateShopSlug(name: string) {
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^A-Za-z0-9\u0E00-\u0E7F\s]/g, "")
    .replace(/\s+/g, "-");
  return `${slug}-${nanoid(16)}`;
}
