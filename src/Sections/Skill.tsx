import SkillsTree from "../components/SkillCards";
import SectionPanel from "../components/SectionPanel";

const Skill = () => {
  return (
    <SectionPanel
      id="Skills"
      variant="skills"
      heading="Technologies"
      lead="Technologies and tools I work with day to day."
    >
      <SkillsTree />
    </SectionPanel>
  );
};

export default Skill;
