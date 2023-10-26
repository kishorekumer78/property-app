import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/libs/prisma';

export async function POST(request: NextRequest) {
	const body = await request.json();
	const { email, name, password } = body;

	// hash password
	const hashedPassword = await bcrypt.hash(password, 12);
	try {
		const user = await prisma.user.create({
			data: {
				email: email,
				name: name,
				hashedPassword: hashedPassword
			}
		});
		return NextResponse.json({ user });
	} catch (error: any) {
		return NextResponse.json({ error: error.message });
	}
}
