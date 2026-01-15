// File: src/lib/database.ts
// Purpose: SQLite database setup and operations for local data storage

import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

/**
 * Initialize SQLite database and create tables
 */
export const initDB = async (): Promise<SQLite.SQLiteDatabase> => {
  if (db) {
    return db;
  }

  try {
    db = await SQLite.openDatabaseAsync('user_data.db');
    
    // Create user_profile table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS user_profile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT UNIQUE NOT NULL,
        image_base64 TEXT,
        phone1 TEXT,
        phone1_country_code TEXT,
        phone2 TEXT,
        phone2_country_code TEXT,
        updated_at INTEGER NOT NULL
      );
    `);

    // Migrate old phone column to phone1 if needed (for existing databases)
    try {
      const tableInfo = await db.getAllAsync<{ name: string }>(
        "PRAGMA table_info(user_profile)"
      );
      const columnNames = tableInfo.map(col => col.name);
      
      // Check if old 'phone' column exists but new columns don't
      if (columnNames.includes('phone') && !columnNames.includes('phone1')) {
        // Add new columns
        await db.execAsync(`
          ALTER TABLE user_profile ADD COLUMN phone1 TEXT;
          ALTER TABLE user_profile ADD COLUMN phone1_country_code TEXT;
          ALTER TABLE user_profile ADD COLUMN phone2 TEXT;
          ALTER TABLE user_profile ADD COLUMN phone2_country_code TEXT;
        `);
        
        // Migrate data from old phone to phone1
        await db.execAsync(`
          UPDATE user_profile SET phone1 = phone, phone1_country_code = '+966' WHERE phone IS NOT NULL;
        `);
      }
    } catch (migrationError) {
      // Migration already done or not needed
      console.log('Migration check:', migrationError);
    }

    // Create addresses table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS addresses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        address_id TEXT UNIQUE NOT NULL,
        userId TEXT NOT NULL,
        label TEXT NOT NULL,
        street TEXT NOT NULL,
        city TEXT NOT NULL,
        country TEXT NOT NULL,
        is_default INTEGER DEFAULT 0,
        data TEXT,
        updated_at INTEGER NOT NULL
      );
    `);

    // Create settings table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT NOT NULL,
        key TEXT NOT NULL,
        value TEXT NOT NULL,
        updated_at INTEGER NOT NULL,
        UNIQUE(userId, key)
      );
    `);

    return db;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

/**
 * Get database instance
 */
export const getDB = async (): Promise<SQLite.SQLiteDatabase> => {
  if (!db) {
    return await initDB();
  }
  return db;
};

/**
 * Save or update profile image in SQLite
 * Removes old image if exists
 */
export const saveProfileImage = async (userId: string, imageBase64: string): Promise<void> => {
  try {
    const database = await getDB();
    
    // Check if profile exists
    const existing = await database.getFirstAsync<{ id: number }>(
      'SELECT id FROM user_profile WHERE userId = ?',
      [userId]
    );

    const now = Date.now();

    if (existing) {
      // Update existing profile, remove old image
      await database.runAsync(
        'UPDATE user_profile SET image_base64 = ?, updated_at = ? WHERE userId = ?',
        [imageBase64, now, userId]
      );
    } else {
      // Insert new profile
      await database.runAsync(
        'INSERT INTO user_profile (userId, image_base64, updated_at) VALUES (?, ?, ?)',
        [userId, imageBase64, now]
      );
    }
  } catch (error) {
    console.error('Error saving profile image:', error);
    throw error;
  }
};

/**
 * Get profile image from SQLite
 */
export const getProfileImage = async (userId: string): Promise<string | null> => {
  try {
    const database = await getDB();
    const result = await database.getFirstAsync<{ image_base64: string | null }>(
      'SELECT image_base64 FROM user_profile WHERE userId = ?',
      [userId]
    );
    return result?.image_base64 || null;
  } catch (error) {
    console.error('Error getting profile image:', error);
    return null;
  }
};

/**
 * Delete profile image from SQLite
 */
export const deleteProfileImage = async (userId: string): Promise<void> => {
  try {
    const database = await getDB();
    await database.runAsync(
      'UPDATE user_profile SET image_base64 = NULL, updated_at = ? WHERE userId = ?',
      [Date.now(), userId]
    );
  } catch (error) {
    console.error('Error deleting profile image:', error);
    throw error;
  }
};

/**
 * Save or update phone numbers in SQLite
 */
export const savePhoneNumbers = async (
  userId: string,
  phone1?: { number: string; countryCode: string },
  phone2?: { number: string; countryCode: string }
): Promise<void> => {
  try {
    const database = await getDB();
    const now = Date.now();
    
    const existing = await database.getFirstAsync<{ id: number }>(
      'SELECT id FROM user_profile WHERE userId = ?',
      [userId]
    );

    if (existing) {
      await database.runAsync(
        `UPDATE user_profile SET 
          phone1 = ?, phone1_country_code = ?,
          phone2 = ?, phone2_country_code = ?,
          updated_at = ? 
         WHERE userId = ?`,
        [
          phone1?.number || null,
          phone1?.countryCode || null,
          phone2?.number || null,
          phone2?.countryCode || null,
          now,
          userId
        ]
      );
    } else {
      await database.runAsync(
        `INSERT INTO user_profile (userId, phone1, phone1_country_code, phone2, phone2_country_code, updated_at) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          userId,
          phone1?.number || null,
          phone1?.countryCode || null,
          phone2?.number || null,
          phone2?.countryCode || null,
          now
        ]
      );
    }
  } catch (error) {
    console.error('Error saving phone numbers:', error);
    throw error;
  }
};

/**
 * Get phone numbers from SQLite
 */
export const getPhoneNumbers = async (userId: string): Promise<{
  phone1: { number: string; countryCode: string } | null;
  phone2: { number: string; countryCode: string } | null;
}> => {
  try {
    const database = await getDB();
    const result = await database.getFirstAsync<{
      phone1: string | null;
      phone1_country_code: string | null;
      phone2: string | null;
      phone2_country_code: string | null;
    }>(
      'SELECT phone1, phone1_country_code, phone2, phone2_country_code FROM user_profile WHERE userId = ?',
      [userId]
    );
    
    return {
      phone1: result?.phone1 && result?.phone1_country_code
        ? { number: result.phone1, countryCode: result.phone1_country_code }
        : null,
      phone2: result?.phone2 && result?.phone2_country_code
        ? { number: result.phone2, countryCode: result.phone2_country_code }
        : null,
    };
  } catch (error) {
    console.error('Error getting phone numbers:', error);
    return { phone1: null, phone2: null };
  }
};

// Legacy functions for backward compatibility
export const savePhoneNumber = async (userId: string, phone: string): Promise<void> => {
  await savePhoneNumbers(userId, { number: phone, countryCode: '+966' });
};

export const getPhoneNumber = async (userId: string): Promise<string | null> => {
  const phones = await getPhoneNumbers(userId);
  return phones.phone1?.number || null;
};

/**
 * Save address to SQLite
 */
export const saveAddress = async (
  userId: string,
  addressId: string,
  addressData: {
    label: string;
    street: string;
    city: string;
    country: string;
    isDefault?: boolean;
    data?: any;
  }
): Promise<void> => {
  try {
    const database = await getDB();
    const now = Date.now();
    const dataJson = addressData.data ? JSON.stringify(addressData.data) : null;

    await database.runAsync(
      `INSERT INTO addresses (address_id, userId, label, street, city, country, is_default, data, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(address_id) DO UPDATE SET
         label = excluded.label,
         street = excluded.street,
         city = excluded.city,
         country = excluded.country,
         is_default = excluded.is_default,
         data = excluded.data,
         updated_at = excluded.updated_at`,
      [
        addressId,
        userId,
        addressData.label,
        addressData.street,
        addressData.city,
        addressData.country,
        addressData.isDefault ? 1 : 0,
        dataJson,
        now,
      ]
    );
  } catch (error) {
    console.error('Error saving address:', error);
    throw error;
  }
};

/**
 * Get all addresses for a user from SQLite
 */
export const getAddresses = async (userId: string): Promise<any[]> => {
  try {
    const database = await getDB();
    const results = await database.getAllAsync<{
      address_id: string;
      label: string;
      street: string;
      city: string;
      country: string;
      is_default: number;
      data: string | null;
    }>(
      'SELECT address_id, label, street, city, country, is_default, data FROM addresses WHERE userId = ? ORDER BY updated_at DESC',
      [userId]
    );

    return results.map((row) => ({
      id: row.address_id,
      label: row.label,
      street: row.street,
      city: row.city,
      country: row.country,
      isDefault: row.is_default === 1,
      data: row.data ? JSON.parse(row.data) : null,
    }));
  } catch (error) {
    console.error('Error getting addresses:', error);
    return [];
  }
};

/**
 * Delete address from SQLite
 */
export const deleteAddress = async (userId: string, addressId: string): Promise<void> => {
  try {
    const database = await getDB();
    await database.runAsync(
      'DELETE FROM addresses WHERE userId = ? AND address_id = ?',
      [userId, addressId]
    );
  } catch (error) {
    console.error('Error deleting address:', error);
    throw error;
  }
};

/**
 * Save setting to SQLite
 */
export const saveSetting = async (userId: string, key: string, value: string): Promise<void> => {
  try {
    const database = await getDB();
    const now = Date.now();
    
    await database.runAsync(
      `INSERT INTO settings (userId, key, value, updated_at)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(userId, key) DO UPDATE SET
         value = excluded.value,
         updated_at = excluded.updated_at`,
      [userId, key, value, now]
    );
  } catch (error) {
    console.error('Error saving setting:', error);
    throw error;
  }
};

/**
 * Get setting from SQLite
 */
export const getSetting = async (userId: string, key: string): Promise<string | null> => {
  try {
    const database = await getDB();
    const result = await database.getFirstAsync<{ value: string }>(
      'SELECT value FROM settings WHERE userId = ? AND key = ?',
      [userId, key]
    );
    return result?.value || null;
  } catch (error) {
    console.error('Error getting setting:', error);
    return null;
  }
};

/**
 * Get all settings for a user
 */
export const getAllSettings = async (userId: string): Promise<Record<string, string>> => {
  try {
    const database = await getDB();
    const results = await database.getAllAsync<{ key: string; value: string }>(
      'SELECT key, value FROM settings WHERE userId = ?',
      [userId]
    );

    const settings: Record<string, string> = {};
    results.forEach((row) => {
      settings[row.key] = row.value;
    });
    return settings;
  } catch (error) {
    console.error('Error getting all settings:', error);
    return {};
  }
};
