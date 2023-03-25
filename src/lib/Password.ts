import * as bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string | null> {
	const saltRounds = 4;

	try {
		const salt = await bcrypt.genSalt(saltRounds);
		const hash = await bcrypt.hash(password, salt);
		return hash;
	} catch(e) {
		return null;
	}
}

export async function validatePassword(known: string, unknown: string): Promise<boolean> {
	try {
		const compare = await bcrypt.compare(unknown, known)
		return compare
	} catch(e) {
		return false;
	}
}