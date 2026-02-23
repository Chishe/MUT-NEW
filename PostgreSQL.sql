-- ==============================
-- ENUM
-- ==============================
CREATE TYPE log_type AS ENUM ('HISTORY', 'ALARM', 'NOTIFICATION');

-- ==============================
-- MACHINE TABLE
-- ==============================
CREATE TABLE
    machine (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        location TEXT,
        is_running BOOLEAN DEFAULT FALSE,
        production INTEGER DEFAULT 0,
        target INTEGER DEFAULT 0,
        speed DOUBLE PRECISION DEFAULT 0,
        temperature DOUBLE PRECISION DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- ==============================
-- LOG TABLE
-- ==============================
CREATE TABLE
    log (
        id SERIAL PRIMARY KEY,
        machine_id INTEGER REFERENCES machine (id) ON DELETE CASCADE,
        type log_type NOT NULL,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        value DOUBLE PRECISION,
        metadata JSONB,
        is_read BOOLEAN DEFAULT FALSE,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- INDEXES
CREATE INDEX idx_log_machine_id ON log (machine_id);

CREATE INDEX idx_log_type ON log (type);

CREATE INDEX idx_log_created_at ON log (created_at);

-- ==============================
-- SETTING TABLE
-- ==============================
CREATE TABLE
    setting (
        id SERIAL PRIMARY KEY,
        line_enabled BOOLEAN DEFAULT FALSE,
        telegram_enabled BOOLEAN DEFAULT FALSE,
        alarm_temp_high DOUBLE PRECISION DEFAULT 80,
        alarm_temp_low DOUBLE PRECISION DEFAULT 10,
        alarm_speed_low DOUBLE PRECISION DEFAULT 50,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );