export interface SkillMapping {
  [key: string]: Skill;
}

export interface Skill {
  name: string;
  description: string;
  levels: SkillLevel[];
}

export interface SkillLevel {
  level: number;
  description: string;
}

export interface SkillMappingJson {
  [key: string]: SkillJson;
}

export interface SkillJson {
  name: string;
  description: string;
  levels: SkillLevelJson[];
}

export interface SkillLevelJson {
  level: number;
  description: string;
}
