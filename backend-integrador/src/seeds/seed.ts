import 'reflect-metadata';
import ds from '../data-source';
import { Strategy, StrategyType } from '../shared/entities/strategy.entity';
(async () => {
  const dataSource = await ds.initialize();
  const repo = dataSource.getRepository(Strategy);
  if ((await repo.count()) === 0) {
    await repo.save([
      repo.create({ nombre: 'ABP', tipo: StrategyType.ABP, descripcion: 'Problemas', fuentes: [] }),
      repo.create({
        nombre: 'Proyectos',
        tipo: StrategyType.ABProyectos,
        descripcion: 'Proyecto integrador',
        fuentes: [],
      }),
      repo.create({
        nombre: 'Servicio',
        tipo: StrategyType.APS,
        descripcion: 'Aprendizaje-Servicio',
        fuentes: [],
      }),
      repo.create({
        nombre: 'Gamificación',
        tipo: StrategyType.GAMIFICACION,
        descripcion: 'Juego',
        fuentes: [],
      }),
    ]);
    console.log('Seeded strategies');
  } else {
    console.log('Strategies already seeded');
  }
  await dataSource.destroy();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
