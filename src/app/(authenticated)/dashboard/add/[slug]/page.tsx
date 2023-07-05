export default function DashboardPage({
  params,
}: {
  params: { slug: string };
}) {
  return <>U are creating {params.slug}</>;
}
